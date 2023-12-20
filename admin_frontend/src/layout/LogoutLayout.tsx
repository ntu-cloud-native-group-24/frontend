import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

const LogoutLayout: React.FC = () => {
    const navigate = useNavigate()
    const refTimer = useRef<number | null>(null);
    const [time, setTime] = useState(5);

    const jumpLogin = () => {
        navigate('/login');
    }

    const startTimer = useCallback(() => {
        if(refTimer.current !== null) return;
        refTimer.current = window.setTimeout(() => {
            navigate('/login')
        }, 5000);
    }, [navigate])

    useEffect(() => {
        startTimer();
    }, [startTimer])

    useEffect(() => {
        window.setTimeout(() => {
            setTime((time) => time - 1)
        }, 1000)
    })

    const subTitle = `將會在 ${time > 0 ? time : 0} 秒後跳轉回登入頁面`

    return (
        <Result
            status="success"
            title="成功登出訂餐管理系統！"
            subTitle={subTitle}
            extra={[
                <Button data-testid='logout-btn' type="default" key="logout" className="bg-blue-100" onClick={jumpLogin}>
                    去登入
                </Button>
            ]}
        />
    )
}

export default LogoutLayout