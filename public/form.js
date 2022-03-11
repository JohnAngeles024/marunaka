const form = document.querySelector('form')
      const username = document.querySelector('#username')
      const password = document.querySelector('#password')
      const display = document.querySelector('.error')
      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        display.textContent = ''
        try {
          const res = await fetch('/api/users/login-user', {
            method: 'POST',
            body: JSON.stringify({ username: username.value, password: password.value }),
            headers: { 'Content-Type': 'application/json' }
            })
          const data = await res.json()
          console.log(data);
          if (res.status === 404) {
            document.getElementById('error').innerHTML = 'Username is not found';
          }
          if(res.status === 403){
            document.getElementById('error').innerHTML = 'Please make sure you are logging in from the right portal';
          }
          if(res.status === 402){
            document.getElementById('error').innerHTML = 'wrong password';
          }
          if (res.status === 200) {
            location.assign('/user');
          }
          // data.role === "admin" ? location.assign('/admin') : location.assign('/user')
        }
         catch (err) {
            console.log(err.message)
          }

        })

    