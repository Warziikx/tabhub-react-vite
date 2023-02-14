import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import i18n from '@emoji-mart/data/i18n/fr.json'
i18n.search_no_results_1 = 'Aucun emoji'


import { Button, Col, Form, FormInstance, Input, Popover, Row } from "antd";

import { useCollection } from "@/lib/hooks/collectionHook";
import { useEffect, useState } from 'react';

interface CollectionFormProps {
	form: FormInstance;
	submitCallback: Function;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ form, submitCallback }) => {
	const { createCollection, updateCollection } = useCollection();
	const iconValue = Form.useWatch('icon', form);

	const onSubmit = async (data: any) => {
		if (data.id === undefined) await createCollection(data);
		else await updateCollection(data);
		form.resetFields();
		submitCallback();
	};


	return (
		<Form
			form={form}
			name="basic"
			layout="vertical"
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onSubmit}
			requiredMark={false}
			onFinishFailed={(errorInfo) => console.log(errorInfo)}
			autoComplete="off"
		>
			<Form.Item hidden={true} name="id"></Form.Item>
			<Row gutter={4}>
				<Col span={2}>
					<Form.Item label="Icon" name="icon" rules={[{ required: true, message: "Veuillez choisir une icone pour votre collection" }]}>
						<Popover
							content={
								<Picker data={data} i18n={i18n}
									onEmojiSelect={(value: any) => form.setFieldValue('icon', `${value.native}`)} />
							}
						>
							<Button icon={iconValue} />
						</Popover>
					</Form.Item>
				</Col>
				<Col span={22}>
					<Form.Item label="Nom de la collection" name="name" rules={[{ required: true, message: "Veuillez saisir un nom pour votre collection" }]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
		</Form >
	);
};
