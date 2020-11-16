import React from 'react';

import classes from './opinions.module.scss';
import Opinion from './opinion/Opinion'

const Opinions = () => {
    return <div className={classes.opinions}>
        <Opinion email="jacekkrajewski12@wp.pl" text="Really enjoyed working with this clear user interface." defaultValue={5} />
        <Opinion email="TAdamczyk@gmail.com" text="Give 5 stars because page is free to use!" defaultValue={5} />
        <Opinion email="Eddensson@gmail.com" text="Working with the data can be really easy using that page." defaultValue={4} />
    </div>
}

export default Opinions