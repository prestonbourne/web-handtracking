

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
  } catch (error) {

  // console.error(error);

  }

 
};


 export function debounce(callback, delay = 1000) {
  let time;
  
  return (...args) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const throttle = (callback, delay = 1500) => {

  let shouldWait = false;


  return (...args) => {
    if(shouldWait) return
    callback(...args)
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }

}

export const generateRandInt = (min,max) => {
  
  const random = (Math.random() * (max - min + 1) + min);
 
  

  if(random > max) return  Math.floor(random);

  if(random < min) return  Math.ceil(random);

  return random

}

export const generateRandFloat = (min, max) => {
  const random = (Math.random() * (max - min + 1) + min);
  return random;
}