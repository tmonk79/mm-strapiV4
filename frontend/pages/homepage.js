import React from "react";
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { fetchAPI } from "../lib/strapi_helper/api";
import ListItem from '../components/listItem/listItem'
import axios from 'axios'

const HomePage = ({homepageContent}) => {
  const router = useRouter();

  console.log("homepageContent")
  console.log(homepageContent)
  console.log("homepageContent End ")

  const logout = async () => {
    try {
      await axios.get('/api/auth/signout');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="loginButton">
        <button onClick={logout}>Logout</button>
      </div>
      <ul className="ul">
        {homepageContent.data.map((item)=> <ListItem items={item}/>)}
      </ul>
    </div>
   
  );
};

// export async function getStaticProps() {
//   const [homepageContent] = await Promise.all([
//     fetchAPI("/homepage")
//   ]);

//   return {
//     props: { homepageContent },
//     revalidate: 1,
//   };
// }


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  console.log(cookies.jwt)
  
  const [homepageContent] = await Promise.all([
    fetchAPI("/api/recipes", cookies.jwt)
  ]);

  return {
    props: { homepageContent },
  };
}

export default HomePage;

