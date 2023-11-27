import React, { useEffect, useRef, useState } from "react";
import { Button, Result } from 'antd';

const LogoutLayout: React.FC = () => {

    const refTimer = useRef<number | null>(null);
    const [time, setTime] = useState(5);

    const jumpLogin = () => {
        //TODO: jump to login page
        console.log('TODO');
    }

    const startTimer = () => {
        if(refTimer.current !== null) return;
        refTimer.current = window.setTimeout(() => {
            console.log('TODO')
        }, 5000);
    }

    useEffect(() => {
        startTimer();
    }, [])

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
                <Button type="default" key="logout" className="bg-blue-100" onClick={jumpLogin}>
                    去登入
                </Button>
            ]}
        />
    )
}

export default LogoutLayout