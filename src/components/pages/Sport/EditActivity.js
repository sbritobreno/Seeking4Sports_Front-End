import api from "../../../utils/api";
import { useEffect, useState } from "react";
import Input from "../../form/Input";
import formStyles from "../../form/Form.module.css";
import styles from "./NewActivity.module.css";
import Select from "../../form/Select";
import { useParams } from "react-router-dom";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMEssage";

function EditActivity() {
  const [token] = useState(localStorage.getItem("token"));
  const { setFlashMessage } = useFlashMessage();
  const [activity, setActivity] = useState({});
  const [cities, setCities] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    api.get(`/sport/${id}`).then((response) => {
      setActivity(response.data.activity);
    });

    api.get("seeking4sports_api/cities").then((response) => {
      setCities(response.data.cities);
    });

    api.get("seeking4sports_api/sportslist").then((response) => {
      setSportList(response.data.sport_list);
    });
  }, [token, id]);

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

  function handleLocation(e) {
    setActivity({
      ...activity,
      location: e.target.options[e.target.selectedIndex].text,
    });
  }

  function handleDate(e) {
    setActivity({
      ...activity,
      date: e.target.options[e.target.selectedIndex].text,
    });
  }

  async function submit(e) {
    e.preventDefault();
    let msgType = "success";
    const formData = new FormData();

    await Object.keys(activity).forEach((key) =>
      formData.append(key, activity[key])
    );

    const data = await api
      .patch(`sport/edit/${activity.id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={styles.newactivity_header}>
        <h1>Edit Activity</h1>
        <p>It will be available on the Home page for other users</p>
      </div>

      <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_images}>
          {(activity.image || preview) && (
            <img
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/sports/${activity.image}`
              }
              alt="Sport img"
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
          options={sportList}
          handleOnChange={handleSport}
          value={activity.sport || ""}
        />
        <Input
          text="Group Name"
          type="text"
          name="group_name"
          placeholder="Type a group name"
          handleOnChange={handleChange}
          value={activity.group_name || ""}
          autoComplete="off"
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
        <Select
          text="Location"
          name="location"
          options={cities}
          handleOnChange={handleLocation}
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
          autoComplete="off"
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  );
}

export default EditActivity;
