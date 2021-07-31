import { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/storage";

function PokemonList() {
    const [imageList, setImageList] = useState([]);

    //on mount, get image list from firebase
    useEffect(function getImageList() {
        var storage = firebase.storage();
        var imageNames = [];
        storage.ref("to-find").list()
            .then((ListResult) => {
                var imageRefList = ListResult.items;
                var urlList = imageRefList.map((imageRef) => {
                    imageNames.push(imageRef.name);
                    return imageRef.getDownloadURL();
                });
                return Promise.all(urlList);
            })
            .then((urlList) => {
                //wrap url and name in an object for each image
                var imagesInfo = urlList.map((url, index) => {
                    return {url, name: imageNames[index]};
                });
                setImageList(imagesInfo);
            })
            .catch((error) => {
                console.log("Error retrieving images: ", error);
            });
    }, []);

    if (imageList.length > 0) {
        return (
            <ul>
                {imageList.map((image, index) => {
                    return (
                        <li key={index}>
                            <img src={image.url} alt={image.name} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <p>Loading images...</p>
    );
}

export default PokemonList;