import Input from "./Input";

type Props = {
    cardNumber:  string;
    cardType:    string;
    setNumber:   Function;
    setType:     Function;
}

const Card = ({ cardNumber, cardType, setNumber, setType }: Props) => {
  
  return(
    <div className="h-full flex flex-col gap-2">
      <Input
        type="text"
        disabled={false}
        placeholder={'Card Type'}
        onChange={(e:any) => setType(e.target.value)}
        value={cardType} />
        <Input
          type="tel"
          disabled={false}
          placeholder={'Card Number'}
          onChange={(e:any) =>setNumber(e.target.value)}
          value={cardNumber} />     
    </div>
  )
}

export default Card