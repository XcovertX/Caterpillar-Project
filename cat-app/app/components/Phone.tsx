import { HTMLInputTypeAttribute, useState } from "react";
import Input from "./Input";

type Props = {
    value: string,
    onChange: any,
    type: HTMLInputTypeAttribute
}

function Phone({ value, onChange }: Props) {
    const [phone, setPhone]     = useState('');
    
    // function for styling the phone number to: (xxx) xxx - xxxx
    const handleValChange = (val:string) => {
    let uTempVal = val.replace(/[^\d.]/g, '');
    uTempVal = uTempVal.replace(/\s/g, '');
    uTempVal = uTempVal.replace(/\-/g, '');
    let dTempVal   = '';
    if(uTempVal.length > 0) {
        dTempVal = dTempVal + "("
        for (let i = 0; (i < uTempVal.length && i < 3 ); i++) {
            dTempVal = dTempVal + uTempVal.at(i);
        };
    };

    if(uTempVal.length >= 4) {
        dTempVal = dTempVal + ") "
        for (let i = 3; (i < uTempVal.length && i < 6 ); i++) {
            dTempVal = dTempVal + uTempVal.at(i);
        };
    };
 
    if(uTempVal.length >= 7) {
        dTempVal = dTempVal + " - "
        for (let i = 6; (i < uTempVal.length && i < 10 ); i++) {
            dTempVal   = dTempVal   + uTempVal.at(i);
        };
    };

    setPhone(dTempVal);
  };

  
  return (
    <Input 
      type="tel" 
      disabled={false} 
      onChange={(e:any) => handleValChange(e.target.value)} 
      value={phone} 
      placeholder="Phone Number" 
    />
    );
  }
  
  export default Phone;