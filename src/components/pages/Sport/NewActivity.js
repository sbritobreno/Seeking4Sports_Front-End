import { useState } from "react";
import Input from "../../form/Input";
import formStyles from "../../form/Form.module.css";
import styles from "./NewActivity.module.css";
import Select from "../../form/Select";
import { sportsOptions, weekdays } from "../../objs";

function CreateActivity() {
  const [activity, setActivity] = useState({});
  const [preview, setPreview] = useState("");

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setActivity({ ...activity, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  }

  function handleSport(e) {
    setActivity({
      ...activity,
      sport: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleDate(e) {
    setActivity({
      ...activity,
      date: e.target.options[e.target.selectedIndex].text,
    });
  }

  function submit(e) {
    e.preventDefault();
    registerNewActivity(activity);
  }

  async function registerNewActivity(sport) {}

  return (
    <section>
      <div className={styles.newactivity_header}>
        <h1>Create a New Activity</h1>
        <p>It will be available on Home page for others users</p>
      </div>

      <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_images}>
          {(activity.image || preview) && (
            <img
              src={preview ? URL.createObjectURL(preview) : activity.image}
              alt="Sport_Image"
            />
          )}
        </div>
        <Input
          text="Sport Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Select
          text="Sport"
          name="sport"
          options={sportsOptions}
          handleOnChange={handleSport}
          value={activity.sport || ""}
        />
        <Select
          text="Date"
          name="date"
          options={weekdays}
          handleOnChange={handleDate}
          value={activity.date || ""}
        />
        <Input
          text="Time"
          type="Time"
          name="time"
          handleOnChange={handleChange}
          value={activity.time || ""}
        />
        <Input
          text="Location"
          type="text"
          name="location"
          placeholder="Type the location"
          handleOnChange={handleChange}
          value={activity.location || ""}
        />
        <Input
          text="Total Players"
          type="number"
          name="total_players"
          placeholder="How many players does it need?"
          handleOnChange={handleChange}
          value={activity.total_players || ""}
        />
        <Input
          text="Short Description"
          type="text"
          name="description"
          placeholder="Type here important info about this activity"
          handleOnChange={handleChange}
          value={activity.description || ""}
        />
        <input type="submit" value="Create" />
      </form>
    </section>
  );
}

export default CreateActivity;
