import { Result } from 'antd'

const UnAuthPage = () => {
    return (
        <Result
            status='403'
            title='403'
            subTitle='Sorry, you have to login first.'
        />
    )
}

export default UnAuthPage