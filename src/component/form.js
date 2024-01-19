import { useEffect, useState } from 'react';


export default function Form() {
    const [inputValue, setInputValue] = useState("");
    const [inputData, setDataValue] = useState("");
    const [allData, setAllData] = useState([]);
    const [isEdit, setEdit] = useState(false);

    const handleSubmit = async () => {
        await fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: inputValue,
                body: inputData,
        
                
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            if (res) {

                fetchData();
            }
        }
        )
    }

    const fetchData = async () => {
        await fetch('http://localhost:3001/posts')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setAllData(data);
        });
}

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/posts/${id}`,{
            method:'DELETE'
        }).then((res)=>{
            if(res){
              
            }

        })
    }


    const handleEdit = async(id) =>{


      

        setEdit(true)
      
        await fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: inputValue,
                body: inputData,
                
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            if (res) {
              

            }
        }
       
        )
        fetchData();

        

    }




    const handleChange = (event) => {
        setInputValue(event.target.value);
       

    };
    const handleChanges = (event) => {
        setDataValue(event.target.value);
    };



    useEffect(() => {
        fetchData()
    }, [])

    return (
        <form>
            <label>Title:
                <input type="text" value={inputValue} onChange={handleChange} />
            </label>
            <label>Body :
                <input type="textarea" value={inputData} onChange={handleChanges} />
            </label>
            <label>
                <button type="submit" onClick={handleSubmit}>submit</button>
            </label>
            <table>
                <th>
                    <td>
                        Title
                    
                    </td>
                    <td>
                        body
                    </td>
                    
                </th>
                {allData.map((item) => {
                    return (
                        <tr>
                            
                        
                            <td>
                               
                                <input value= {item.title}></input>
                                <input value= {item.body}></input>
                                
                            </td>
                            
                
                
                            <td>
                                <button onClick={()=>handleEdit(item.id)}>Edit</button>
                                <button onClick={()=>handleDelete(item.id)}>Delete</button>

                            </td>
                        </tr>
                    )
                })}
            </table>




        </form>

    )
};
