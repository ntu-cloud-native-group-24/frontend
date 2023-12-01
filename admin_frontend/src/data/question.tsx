import type { QuestionSectionType } from "../interfaces/QuestionInterface"
export const questionData: Array<QuestionSectionType> = [
    {
        section: '餐廳管理疑問',
        panels: [
            {
                title: '看到的介面是否與顧客看到的介面相同？',
                description: <p>是的，我們希望可以讓商家對顧客所看到的介面有概念，並可以即時了解到顧客的觀感</p>,
            },
            {
                title: '為什麼有些餐點是灰白色的？',
                description: <p>這是因為該餐點已被下架，可以透過點擊該餐點，並在<p className="font-bold">餐點狀況</p>一欄點擊並上架餐點</p>
            },
            {
                title: '怎麼快速看到餐點資訊？',
                description: <p>可以透過點擊指定餐點的到該餐點的資訊</p>
            },
            {
                title: '怎麼使用過濾功能來快速找到餐點？',
                description: <div className="flex flex-col gap-3"><p>電腦版的使用者可以直接在介面右側找到該功能</p><p>電話版可以在介面右下側找到懸浮按鈕，點擊展開該功能的介面</p></div>
            },
            {
                title: '營業時間怎麼作用？',
                description: <div className="flex flex-col gap-3"><p>介面上顯示的營業時間為註冊時所定的時間，非必要時請勿更改。倘若需要更改該天的營業時間，需要在該天的營業時間前更改。</p><p className="font-bold">建議先將餐廳結束營業，再調整該天的營業時間</p></div>
            },
            {
                title: '怎麼安排營業時間及快速臨時結束營業？',
                description: <p>與過濾功能同放在一起</p>
            }
        ]
    },
    {
        section: '餐點管理疑問',
        panels: [
            {
                title: '怎麼新增餐點？',
                description: <p>在餐點管理介面的右上角的 Add New 按鈕，點擊後即可新增餐點</p>
            },
            {
                title: '怎麼永久刪除（非下架）餐點？',
                description: <p>在餐點管理介面中的表格中找到該餐點並在該欄位的最右側點擊刪除按鈕</p>
            },
            {
                title: '怎麼更新餐點資訊？',
                description: <div className="flex flex-col gap-2"><p>1. 在餐點管理介面中找到該餐點並點擊即可查看餐點資訊並進行編輯更改</p><p>2. 在餐點管理介面中的表格找到該餐點，並在該餐點的欄位右側點擊編輯按鈕</p></div>
            },
            {
                title: '餐點的欄位顯示較灰色是什麼意思？',
                description: <p>這代表該餐點目前是下架當中</p>
            }
        ]
    },
    {
        section: '訂單管理疑問',
        panels: [
            {
                title: '如何分辨訂單的時間序？',
                description: <p>可以透過選擇 今日、未來、過去 的訂單管理介面來查看不同時間序的餐點</p>
            },
            {
                title: '今日訂餐管理是否為即時更新？',
                description: <p>當顧客新增訂單並發生請求後，將會在今日訂單管理介面看到新建立的訂單</p>
            },
            {
                title: '今日訂單管理是否可以快速知道顧客的要求？',
                description: <p>點擊該訂單即可以在右側顯示該訂單的詳細資訊，包括訂單的創建時間、備註、顧客用戶名、餐點請求、取餐方式等</p>
            },
            {
                title: '要怎麼接受/拒絕訂單？',
                description: <p>點擊該訂單後即可在右側下方選擇是否接受或拒絕訂單</p>
            },
            {
                title: '顧客反悔刪除訂單後，是否會即時顯示在介面',
                description: <p>會，該訂單會呈現紅色狀態，並只能點擊確認（不能接受或拒絕訂單）</p>
            },
            {
                title: '接受訂單後，是否還需要其他動作？',
                description: <p>當接受訂單之後，訂單會進入準備中的狀態，您需要在餐點完成後選擇該訂單點擊完成訂單通知顧客</p>
            }
        ]
    },
    {
        section: '帳號及資料疑問',
        panels: [
            {
                title: '為什麼更改餐廳資料後有些資料（如餐廳名稱或地址等）不會即時更新？',
                description: <p>有些資料需要經過認證後才會進行更新，以便保護顧客的權益</p>
            },
            {
                title: '社群帳號是否為必要的？',
                description: <p>否，連結社群帳號僅供顧客更快瞭解您的餐廳資訊</p>
            },
            {
                title: '若找不到指定銀行怎麼辦？',
                description: <p>請透過官方信箱聯繫我們處理後續</p>
            }
        ]
    },
    {
        section: '通知疑問',
        panels: [
            {
                title: '訂單通知是否會依時間排序？',
                description: <p>會，通知會依最近時間為最上方</p>        
            },
            {
                title: '訂單通知是否有包括所有資訊？',
                description: <p>訂單通知僅顯示餐點資訊及訂單部分資訊，詳細資訊請到訂單管理介面查詢，或是直接點擊通知右側的連結按鈕跳轉至該訂單</p>
            },
            {
                title: '通知介面會顯示什麼樣的通知呢？',
                description: <p>會顯示訂單通知、訂單取消通知及更新通知</p>
            }
        ]
    },
]