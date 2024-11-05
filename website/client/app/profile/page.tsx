import dayjs from 'dayjs'

export default function Page() {
    return (
        <div className="p-4 max-w-5xl w-full mx-auto py-20">
            <div className="my-2 border-b border-primary py-6 flex">
                <div className="bg-primary/20 h-[150px] aspect-square border border-primary rounded-full">

                </div>
                <div className="ml-4 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-primary">John Doe</h1>
                    <h2>john.doe@gmail.com</h2>
                </div>
            </div>
            <div className="py-4">
                <h2 className="text-3xl font-bold">ประวัติศาสตร์</h2>
                <div className="my-2">
                    <HistoryItem title="lnwza556" date={dayjs(new Date)} />
                </div>
            </div>
        </div>
    )
}

function HistoryItem({ title, date } : { title: string, date: dayjs.Dayjs }) {
    return (
        <div className='flex justify-between items-center py-4 border-b border-primary'>
            <h3 className="text-xl font-bold">{title}</h3>
            <p>{date.format('DD/MM/YYYY')}</p>
            <div>
                <button className="bg-primary text-background p-2 px-4 rounded-md">Continue</button>
            </div>
        </div>
    )
}