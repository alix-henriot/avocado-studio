import { Button, Divider } from '@nextui-org/react'
import React from 'react'
import SectionTitle from '../ui/SectionTitle'
import { MessageCircle } from 'lucide-react'

type FormStartChatProps = {
    step: number;
}

const FormStartChat: React.FC<FormStartChatProps> = ({step}) => {
    const startChat = (step: number) => console.log(`User preffered chatting from step ${step}`);
    
  return (
    <div className="grid grid-flow-row px-3 pb-4 sm:px-0 place-items-center text-center mx-auto">
        <Divider orientation="horizontal" className="mb-8 max-w-20" />
        <SectionTitle title="Prefer discussing on Wechat?" />
        <Button variant="bordered" onPress={() => startChat(step)}>
        Start chat
        <MessageCircle className="w-4 h-4" />
        </Button>
    </div>
  )
}

export default FormStartChat