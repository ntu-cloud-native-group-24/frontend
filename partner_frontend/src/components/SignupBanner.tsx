import { Button, Flex, Typography } from "antd"

const SignupBanner = () => {

    const onClickSignup = () => {
        window.location.replace('/signup')
    }

    const onClickLogin = () => {
        //TODO: redirect to login page
        console.log('TODO')
    }

    return (
        <div className="h-[30rem] w-full bg-[url('/src/assets/food.jpg')]">
            <Flex className="h-full w-full text-white pl-32" align="center">
                <Flex vertical>
                    <Typography.Title style={{ color: 'white', fontSize: 48 }}>
                        Welcome to join us!
                    </Typography.Title>
                    <Flex justify="space-evenly">
                        <Button onClick={onClickSignup} type="primary" className="bg-black text-white w-[7rem] h-[3rem]">Sign up</Button>
                        <Button onClick={onClickLogin} type='primary' className="bg-white text-black w-[7rem] h-[3rem]">Log  in</Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default SignupBanner