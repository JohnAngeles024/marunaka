const form = document.querySelector('#registerform')
      const username = document.querySelector('#username')
      const password = document.querySelector('#password')
      const name = document.querySelector('#name')
      const email= document.querySelector('#email')
      const display = document.querySelector('.error')
      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        display.textContent = ''
        try {
          const res = await fetch('/api/users/register-user', {
            method: 'POST',
            body: JSON.stringify({ username: username.value, password: password.value, name: name.value, email: email.value }),
            headers: { 'Content-Type': 'application/json' }
            })
          const data = await res.json()
          console.log(data);
        }
         catch (err) {
            console.log(err.message)
          }

        })
