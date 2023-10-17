
import Input from "./Input";

type Props = {
    address:     string;
    city:        string;
    state:       string;
    country:     string;
    addressType: string;
    setAddress:  Function;
    setCity:     Function;
    setCountry:  Function;
    setState:    Function;
}

const Address = ({ address, 
                   city,
                   state, 
                   country, 
                   addressType, 
                   setAddress, 
                   setCity, 
                   setCountry, 
                   setState }: Props) => {
  
  return(
    <div className="h-full flex flex-col gap-2">
      <Input
        type="text"
        disabled={false}
        placeholder={addressType + ' Street Address'}
        onChange={(e:any) =>setAddress(e.target.value)}
        value={address} />
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          disabled={false}
          placeholder={addressType + ' City'}
          onChange={(e:any) =>setCity(e.target.value)}
          value={city} />
        <Input
          type="text"
          disabled={false}
          placeholder={addressType + ' State'}
          onChange={(e:any) =>setState(e.target.value)}
          value={state} />
        <Input
          type="text"
          disabled={false}
          placeholder={addressType + ' Country'}
          onChange={(e:any) =>setCountry(e.target.value)}
          value={country} />
        </div>
    </div>
  )
}

export default Address