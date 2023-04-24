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

