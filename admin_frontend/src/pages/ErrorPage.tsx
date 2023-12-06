import { Result } from 'antd'

const ErrorPage = () => {
    return (
        <Result
            status='404'
            title='404'
            subTitle='Not exists such page QAQ'
        />
    )
}

export default ErrorPage