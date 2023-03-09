import defaultCardImage from '../assets/images/sample.png';
const Card = ({data, selectedCardFunc}) => {
	const {cached_file_url: cardImage, name, contract_address, token_id} = data;

	const handleCardClick = () => {
		selectedCardFunc(contract_address, token_id);
	};
	return (
		name !== null && (
			<div onClick={handleCardClick} target="_blank" rel="noreferrer">
				<div className="card">
					<img
						src={cardImage || defaultCardImage}
						alt=""
						className="card-image"
						height={250}
					/>
					<div className="card-details">
						<h3 className="card-title">{name}</h3>
						<div>
							<h4 className="card-title"># {token_id}</h4>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Card;
