export interface IntroduceProps {
    picture_url: string;
    title: string;
    description: string;
}

export const IntroduceData: IntroduceProps[] = [
    {
        picture_url: '/src/assets/1.jpg',
        title: 'More Opportunity',
        description: 'Customers come from everywhere at network!'
    },
    {
        picture_url: '/src/assets/2.jpg',
        title: 'Increase Income',
        description: 'New and more customer enjoy your foods'
    },
    {
        picture_url: '/src/assets/3.png',
        title: 'Focus on business',
        description: "You don't have to bother on payment and trivial things"
    },
    {
        picture_url: '/src/assets/4.png',
        title: 'Easier to Analysis',
        description: 'Feel free to view on Analytics page for marketing planning'
    },
    {
        picture_url: '/src/assets/5.png',
        title: '24/7 Online Support',
        description: 'Have any problem when using? Reach our support team!'
    }
]