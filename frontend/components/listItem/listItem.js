import { getStrapiMedia } from "../../lib/strapi_helper/media";
import classes from './listItem.module.css';
import Link from "next/link";

const ListItem = (props) => {
    const {items} = props
    // console.log(items.attributes)
    return <li className={classes.li} key={items.id}>
                
                    <div>
                        {/* <img className={classes.img} src={getStrapiMedia(items.items.image)} /> */}
                        <p className={classes.title}>{ items.attributes.Title}</p>
                        {
                            items.attributes.Difficulty &&
                            <p className={classes.price}>{items.attributes.Difficulty}</p>
                        }
                      
                    </div>
             
            
             </li>
}

export default ListItem
