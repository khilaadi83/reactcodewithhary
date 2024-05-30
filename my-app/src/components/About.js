import React, {useState} from 'react'

export default function About() {
   
    const [mystyle, setMystyle] = useState({
        color: 'black',
        backgroundColor: 'white'
    })
    const [btntext, setbtntext] = useState('Enable dark Mode')
    const toggleStyle = function(){
       if (mystyle.color ==='black'){
        setMystyle({
            color: 'white',
            backgroundColor: 'black'
            
        })
        setbtntext('Enable Light mode')
       }else{
           setMystyle({
            color: 'black',
            backgroundColor: 'white'
           }) 
           setbtntext('Enable dark mode')
       }
    }
    return (
        <div>
          
           
            <div className="container" style={mystyle}>
            <button type="button" class="btn btn-success my-3 mb-3" onClick={toggleStyle}>{btntext}</button>
                <div id="accordion" style={mystyle}>
                    
                    <div className="card" style={mystyle}>
                    
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    About us
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
