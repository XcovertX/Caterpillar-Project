
// function for dealing with bigint type error while converting to string
export function replacer(key:any, value:any) {
    if (typeof value === 'bigint') {
      return {
        type: 'bigint',
        value: value.toString()
      };
    } else {
      return value;
    }
  }
  
  // function for dealing with bigint type error while converting from string
  export function reviver(key:any, value:any) {
    if (value && value.type == 'bigint') {
      return BigInt(value.value);  
    }
    return value;
  }

  // function for formattion dates
  export function dateFormater(date:Date) {
    const tempDate = new Date(date)
    const day      = tempDate.getDate() + 1;
    const month    = tempDate.getMonth() + 1;
    const year     = tempDate.getFullYear();
    return `${month}/${day}/${year}`;

  }

  export function buildTrackingNumber() {
    const rand = Math.random()
    const num = (rand * 100000000).toString()
    return "Unq" + num + "US"
  }

  export function getRandomDate() {
    const randMonth = Math.floor(Math.random() * 12)
    const randDay = Math.floor(Math.random() * 30)
    return new Date(randMonth.toString() + "-" + randDay.toString() + "-" +"2024")
  }