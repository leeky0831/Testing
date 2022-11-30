import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './FlickrSearch.css';
import { BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FLICKR_API_KEY } from './ApiKey';

function FlickrSearch() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<p>Page Not Found</p>} />
                    <Route path="/" element={<SearchPage />}>
                        <Route path="/:searchText" element={<ResultPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export function SearchPage() {
    const params = useParams();
    const [input, setInput] = useState(params.searchText ? params.searchText : "");

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${input}`)
    }

    return (
        <div className="flickrSearch">
            <form onSubmit={handleSubmit}>
                <h1>Flickr Search</h1>
                <TextField label="Search" size="small" value={input} onChange={handleInputChange} />
                <Button className="searchBtn" variant="contained" size="medium" type="submit">Search</Button>
            </form>

            <Outlet />
        </div>
    )
}

export function ResultPage() {
    const params = useParams();
    const [imgJson, setImgJson] = useState("");

    useEffect(() => {
        const flikcrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&text=${params.searchText}&per_page=24&page=1&format=json&nojsoncallback=true`;

        fetch(flikcrUrl).then((response) => response.json()).then((data) => {
            setImgJson(data.photos.photo);
        })

    }, [params]);

    return (
        <div className="resDiv">
            {
                imgJson ? imgJson.map(data =>
                    <img src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`} alt={data.id} />
                ) : <p>Start searching now</p>
            }
        </div >
    )
}

export default FlickrSearch;