import {postData} from '../services/services'

function forms (){
    //Forms

    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо скоро мы свами свяжимся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

            statusMessage.textContent = message.loading;
            form.append(statusMessage)

            form.insertAdjacentElement('afterend', statusMessage)  // ?
            const formData = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data)
                    statusMessage.textContent = message.success
                    statusMessage.remove()
                }).catch(() => {
                statusMessage.textContent = message.failure
            }).finally(() => {
                form.reset()
            })

        })
    }
}
export default forms;