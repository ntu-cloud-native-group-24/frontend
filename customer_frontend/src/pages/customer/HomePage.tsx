export interface CustomerProps {
    login: boolean;
}

const HomePage = ({ login }: CustomerProps) => {
    return (
        <div>HomePage</div>
    )
}

export default HomePage