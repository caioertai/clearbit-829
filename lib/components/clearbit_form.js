const initClearbitForm = () => {
  const authorization = "Bearer sk_33883e2b8b3066b2216f3dd4aa063ee0";
  const form = document.querySelector("#clearbitForm");
  const emailInput = form.querySelector("#clearbitEmail");
  
  const userNameField = document.querySelector("#userName");
  const userEmailField = document.querySelector("#userEmail");
  const userBioField = document.querySelector("#userBio");
  const userLocationField = document.querySelector("#userLocation");
  const nullUser = {
    person: {
      name: {
        fullName: "User not found."
      },
      email: "N/A",
      bio: "N/A",
      location: "N/A"
    }
  }
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value;
    fetchEmailInfo(email);
  });
  
  const displayInfo = (data) => {
    console.log(data);
    const person = data.person
    userNameField.innerText = person.name.fullName
    userEmailField.innerText = person.email
    userBioField.innerText = person.bio || "Bio not found!"
    userLocationField.innerText = person.location
  }
  
  const fetchEmailInfo = (email) => {
    const url = `https://person-stream.clearbit.com/v2/combined/find?email=${email}`
    
    fetch(url, {
      headers: { Authorization: authorization }
    }).then(response => response.json())
      .then(displayInfo)
      .catch((error) => {
        displayInfo(nullUser)
      })
  };  
}

export { initClearbitForm };
