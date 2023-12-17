import { Button, Card, Flex, Input, Typography, message } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/user";
import { setToken } from "../api/axiosUtility";

export interface loginProps {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ login, setLogin } : loginProps) => {
    const nagivate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg: string) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const error = (msg: string) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const warning = (msg: string) => {
        messageApi.open({
          type: 'warning',
          content: msg,
        });
    };

    const onLogin = async () => {
        if( username.length === 0 || password.length === 0 ){
            warning("Please input username or password!")
            return
        } 

        const response = await userApi.login(username, password);
        if( response && response.status === 200 ){
            success('Login success!');
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setLogin(true);
            nagivate('/store');
        } else {
            error(response?.data.message || 'Server Encounter Error!');
            setUsername('');
            setPassword('');
        }
    }

    useEffect(() => {
        if( login ) {
            nagivate('/')
        }
    }, [login, nagivate])

    return (
        <Flex vertical 
              justify="center"
              align="center"
              className='h-screen w-screen bg-[url("https://wallpaperaccess.com/full/4115675.jpg")] bg-cover'>
                {contextHolder}
            <Card
                title={(<Typography.Title className="pt-4">Login</Typography.Title>)}
                style={{ width: 450 }}
                className="opacity-80"
            >
                <Flex vertical gap="large">
                    <Flex vertical gap="middle">
                        <Input data-testid='username-input' placeholder="input username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input.Password data-testid='password-input' placeholder="input password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Flex>
                    <Button type="link" size="small" >Forget password?</Button>
                    <Button data-testid='btn-input' type="primary" onClick={onLogin}>Login</Button>
                </Flex>
            </Card>
        </Flex>
    )
}

export default LoginPage