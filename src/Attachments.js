import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default class Attachments extends React.Component {
	constructor( props) {
		super( props );
		this.state = {
			files: []
		}
	}

	handleDateClick( files) {
		this.setState( { files } );
	}

	render() {
		const { Dragger } = Upload;

		const props = {
				name: 'file',
				multiple: true,
				action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
				onChange(info) {
					const { status } = info.file;
					if (status !== 'uploading') {
						return;
					}
					if (status === 'done') {
						return message.success(`${info.file.name} file uploaded successfully.`);
					} else if (status === 'error') {
						return message.error(`${info.file.name} file upload failed.`);
				}
			},
		};

		return(
			<Dragger {...props} onChange={ files => this.handleDateClick( files ) }>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibit from uploading company data or other
					band files
				</p>
			</Dragger>
		);
	}
}
