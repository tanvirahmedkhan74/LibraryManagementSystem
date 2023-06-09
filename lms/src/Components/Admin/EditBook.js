import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditBook() {
  const { BookID } = useParams();
  // console.log(BookID);
  const [book, setBook] = useState("");

  axios.defaults.withCredentials = true;

  const [title, setTitle] = React.useState("");
  const [publisher, setPublisher] = React.useState("");
  const [isbn, setIsbn] = React.useState("");

  const [publicationDate, setPublicationDate] = React.useState("");
  const [edition, setEdition] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [copies, setCopies] = React.useState("");

  const [cover, setCover] = React.useState("");

  // axios call to get book details from "/getBook/:id"

  useEffect(() => {
    axios.get(`http://localhost:3001/book/getBook/${BookID}`).then((res) => {
      console.log(res);
      setBook(res.data[0]);
      setTitle(res.data[0].Title);
      setPublisher(res.data[0].Publisher);
      setIsbn(res.data[0].ISBN);
      const dateObj = new Date(res.data[0].PublicationDate);
      const formattedDate = dateObj.toISOString().slice(0, 10);
      setPublicationDate(formattedDate);
      setEdition(res.data[0].Edition);
      setCategory(res.data[0].Category);
      setCopies(res.data[0].AvailableCopies);
      setCover(res.data[0].CoverImage);
    });
  }, []);

  // axios call to get all the category Names from "/getCategory"

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/book/getCategory").then((res) => {
      //console.log(res);
      setCategoryList(res.data);
    });
  }, []);

  //console.log(book);

  const handleCover = (event) => {
    setCover(event.target.files[0]);
  };

  // Update to /updateBook with title, publisher, isbn, publicationDate, edition, category, copies, cover, id
  const handleUpdate = (event) => {
    if (copies < 0) {
      alert("Available Copies cannot be less than 0");
      return;
    } else if (edition < 0) {
      alert("Edition cannot be less than 0");
      return;
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publisher", publisher);
      formData.append("isbn", isbn);
      formData.append("publicationDate", publicationDate);
      formData.append("edition", edition);
      formData.append("category", category)
      formData.append("copies", copies);
      formData.append("BookID", BookID);
      if (cover) {
        formData.append("image", cover);
      }

      axios
        .put("http://localhost:3001/book/updateBook", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          alert("Book Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPublisher4"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Publisher
          </label>
          <input
            type="text"
            className="form-control"
            id="inputISBN4"
            value={publisher}
            onChange={(event) => {
              setPublisher(event.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="inputISBN4"
            value={isbn}
            onChange={(event) => {
              setIsbn(event.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Publication Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="inputdate4"
            value={publicationDate}
            onChange={(event) => {
              setPublicationDate(event.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            Edition
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={edition}
            onChange={(event) => {
              setEdition(event.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            Copies
          </label>
          <input
            type="number"
            className="form-control"
            id="inputCity"
            value={copies}
            onChange={(event) => {
              setCopies(event.target.value);
            }}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Category
          </label>
          <select
            id="inputState"
            className="form-select"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option>Choose...</option>
            {categoryList.map((category) => (
              <option key={category.CategoryID} value={category.Name}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(event) => {
              setCover(event.target.files[0]);
            }}
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
          >
            Button
          </button>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
