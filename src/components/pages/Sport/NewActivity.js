import Input from '../../form/Input'
import { Link } from 'react-router-dom'
import styles from '../../form/Form.module.css'

function CreateActivity() {

    function handleChange(e) {
    }

    function handleSubmit(e) {
    }

    return (
        <section className={styles.form_container}>
            <h1>New Activity</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text= "Sport"
                    type="text"
                    name="sport"
                    placeholder="Type the sport"
                    handleOnChange={handleChange}                
                />
                 <Input 
                    text= "Date"
                    type="date"
                    name="date"
                    placeholder="Type the date"
                    handleOnChange={handleChange}                
                />
                <input type="submit" value="Create" />
            </form>
        </section>
    )
}

export default CreateActivity;