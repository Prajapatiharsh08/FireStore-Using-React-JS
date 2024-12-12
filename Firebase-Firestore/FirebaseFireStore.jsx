import React, { useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from '../../firebase';

const db = getFirestore(app)

export default function FirebaseFireStore() {
    const [data, setData] = useState([])

    async function AddData() {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Bhavesh",
                last: "Vishwakarma",
                born: 2004
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function GetData() {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            fetchedData.push({ id: doc.id, ...doc.data() }); 
        });
        setData(fetchedData);  
    }

    async function DeleteData(docId) {
        try {
            await deleteDoc(doc(db, "users", docId));
            console.log(`Document with ID ${docId} deleted successfully.`);
            GetData();
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }

    return (
        <div>
            <h1>Firebase-Firestore</h1>
            <button onClick={AddData}>Add-Data</button>&nbsp;&nbsp;
            <button onClick={GetData}>Get-Data</button>
            <div>
                {data.map((el, i) => (
                    <div key={el.id}>
                        <li>{el.first} {el.last} - Born: {el.born}</li>
                        <button onClick={() => DeleteData(el.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
