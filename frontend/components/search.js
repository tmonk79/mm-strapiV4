import React from 'react';
import Image from 'next/image'

import {getStrapiMedia} from '../lib/strapi_helper/media'
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styles from './search.module.css';

const searchClient = instantMeiliSearch(
  "https://api.dessertcorner.com/search",
  ""
);


const Hit = ({ hit }) => (
  <div key={hit.id}>
    <div className="hit-Title">
      <Highlight attribute="Title" hit={hit} />
    </div>
    {/* { <div>
    <Image
     src={getStrapiMedia(hit.Image)} 
      alt="Picture of the author"
      width={500}
      height={500}
    />
    </div> } */}
    <img src={`https://api.dessertcorner.com${hit.Image[0].url}`} />
  
  </div>
);

function Search() {
  return (
    <div className={styles.container}>
      <InstantSearch
    indexName="recipe"
    searchClient={searchClient}
  >
    <SearchBox className={styles.box}/>
    <Hits hitComponent={Hit} />
  </InstantSearch>
  
    </div>
    
  );
}

export default Search;
