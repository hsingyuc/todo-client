import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default class Attachment extends React.PureComponent {
	render() {
		const { Dragger } = Upload;

		return(
			<Dragger 
				name='file'
				single
				action={`${process.env.REACT_APP_SERVER_URL}/upload`}
				onChange={(uploadInfo) => {
					const { status } = uploadInfo.file;
					if (status === 'done') {
						message.success(`${uploadInfo.file.name} file uploaded successfully.`);
						const { onUpload } = this.props;
						if ( uploadInfo.file.response && uploadInfo.file.response.filename ) {
							onUpload(uploadInfo.file.response.filename);
						}
					} else if (status === 'error') {
						message.error(`${uploadInfo.file.name} file upload failed.`);
					}
				}}
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Drag'n'drop image, or click to select file.</p>
				<p className="ant-upload-hint">Support for a single upload.</p>
			</Dragger>
		);
	}
}
