import { ref, reactive } from 'vue'
import { logout, updatepassword } from "~/api/manager"
import { showModal, toast } from "~/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export function useRepassword() {
    const formRef = ref(null);
    // 修改密码
    const formDrawer = ref(null);

    const form = reactive({
        oldpassword:"",
        password:"",
        repassword:""
    })

    const rules = {
        oldpassword:[
            { 
                required: true, 
                message: '旧密码不能为空', 
                trigger: 'blur' 
            },
        ],
        password:[
            { 
                required: true, 
                message: '新密码不能为空', 
                trigger: 'blur' 
            },
        ],
        repassword:[
            { 
                required: true, 
                message: '确认密码不能为空', 
                trigger: 'blur' 
            },
        ]
    }

    const onSubmit = () => {
        formRef.value.validate((valid)=>{
            if(!valid){
                return false
            }
            formDrawer.value.showLoading();
            updatepassword(form).then(res => {
                // 提示成功
                toast('success', '修改密码成功，请重新登录')
                store.dispatch("logout")
                // 跳转回登录页
                router.push('/login')
            }).finally(() => {
                formDrawer.value.hideLoading();
            })
        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open();

    return {
        formDrawerRef,
        form,
        rules,
        onSubmit,
        openRePasswordForm
    }

}

export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否要退出登录？").then(res => {
            logout().finally(() => {
                store.dispatch("logout")
                // 跳转回登录页
                router.push('/login')
                // 提示退出成功
                toast("success", "退出登录成功")
            })
        })
    }

    return {
        handleLogout
    }
}