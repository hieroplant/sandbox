'use client'

import React from 'react';
import { TextField } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ActuatorForm {
	name: string;
	description: string;
}



const NewIssuePage = () => {
	const router = useRouter();
	const {register, control, handleSubmit} = useForm<ActuatorForm>();
return (

<form className='max-w-xl space-y-3' 
onSubmit={handleSubmit(async(data) => {
	try {
		await axios.post('/api', data);
		router.push('/actuator')
		
	} catch (error) {
		
	}
	})}>
  <TextField.Root placeholder="Name" {...register ('name')}>
	<TextField.Slot>
	</TextField.Slot>
</TextField.Root>

  <TextField.Root placeholder="Description" {...register ('description')}>
	<TextField.Slot>
	</TextField.Slot>
</TextField.Root>
<Button>Submit New Actuator</Button>


</form>
);
}

export default NewIssuePage;