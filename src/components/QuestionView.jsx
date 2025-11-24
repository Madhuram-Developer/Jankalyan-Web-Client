import React from 'react'
import { CornerUpLeft } from 'lucide-react'


const QuestionView = ({ question, onBack }) => {
    return (
        <div className='flex flex-col h-full justify-between'>
            <div className='flex flex-col'>
                <div className='border-b border-b-[#0000001C] flex-1'>
                    <header className='flex px-10 items-center gap-2 py-3'>
                        <CornerUpLeft onClick={onBack} className="cursor-pointer" />
                        <h1 className='text-black text-xl '>Back</h1>
                    </header>
                </div>
                <div className='px-10 flex flex-col justify-between h-full'>
                    <div className='flex mt-4 gap-8'>
                        <h1 className='text-black font-bold text-xl underline '>Question</h1>
                        <p className='bg-[#742B0024] px-3 rounded-2xl flex items-center'>{question.category}</p>
                        <p>{question.status}</p>
                    </div>
                    <h2 className='font-semibold py-3 text-xl'>{question.question}</h2>
                    <h1 className='font-bold underline text-xl'>Answer</h1>
                    <h4 className='pt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita hic explicabo reiciendis tempore deserunt repellat fugiat, ullam ea, reprehenderit numquam eos asperiores! Officia, natus perspiciatis vel corrupti architecto asperiores.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quis? Laborum incidunt cumque recusandae, reprehenderit sit eaque vel quam? Laborum pariatur in quaerat quas fuga quidem dolor quis ratione placeat!</h4>
                </div>
            </div>
            <div className='px-10 pt-8'>
                <h3 className='font-bold underline'>About User</h3>
                <h4><span className='font-bold'>Name:</span> Username</h4>
                <h4><span className='font-bold'>Phone:</span> 90934324324</h4>
                <h4><span className='font-bold'>DOB:</span> 15 July, 2024</h4>
            </div>
        </div>
    )
}

export default QuestionView