export const postData = async (data) => {
  const jsonData = JSON.stringify(data);

  try {
    const res = await fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {

   console.error(error);

  }

 
};


 export function debounce(callback, delay = 1000) {
  let time;
  
  return (...args) => {
    clearTimeout(time);
    console.log(time)
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const throttle = (callback, delay = 1500, ...args) => {

  let shouldWait = false;


  return (...args) => {
    callback(...args)
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }


}