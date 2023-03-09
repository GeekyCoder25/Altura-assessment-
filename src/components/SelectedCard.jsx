import React from 'react';
import defaultCardImage from '../assets/images/sample.png';

const SelectedCard = ({data}) => {
	const {nft, owner} = data;
	const {metadata, chain, contract_address, token_id} = nft;
	const cardImage = data.nft.cached_file_url || defaultCardImage;
	const bannerImage = data.contract?.metadata?.cached_banner_url;
	return (
		<>
			<div className="modal">
				<i className="fas fa-xmark"></i>
				<div className="banner-image-container">
					<img src={bannerImage || cardImage} alt="" className="banner-image" />
				</div>
				<div className="card-modal-body">
					<div className="card-modal-header">
						<img src={cardImage} alt="profile" className="profile-image" />
						<span
							className="status"
							style={{
								backgroundColor: data.status === 'PENDING' ? 'orange' : 'green',
							}}
						>
							{data.status}
						</span>
					</div>
					<div className="card-modal-content">
						<p>{metadata.description}</p>
						<h4>Mint Date : {nft?.mint_date?.split('T')[0]}</h4>
						<h4>Address: {owner}</h4>
					</div>
					<div className="card-modal-footer">
						<h4>Chain: {chain}</h4>
						<a
							href={`https://opensea.io/assets/${chain}/${contract_address}/${token_id}
							`}
							className="bid-button"
						>
							Place Bid
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default SelectedCard;
