import * as React from 'react'

interface IReqData {
  ether: string,
  addr: string
}

interface ITxcList{
  txs: {
    reqData: IReqData,
    resTx: any[]
  }
}

export const TxList = ({ txs }: ITxcList) => {
  if (!txs) return null;

  return (
    <>
      {txs && txs.resTx.map((item) => (
        <div key={item} className="txs__block">
          <ul className="txs__list">
            <li className='txs__list-item'>
              <span className='txs__list-item-key'>From:</span>{' '}
              <span className='txs__list-item-value'>{item.from}</span>
            </li>
            <li className='txs__list-item'>
              <span className='txs__list-item-key'>To: </span>
              <span className='txs__list-item-value--primary'>{item.to}</span>
            </li>
            <li className='txs__list-item'>
              <span className='txs__list-item-key'>amount: </span>
              <span className='txs__list-item-value'>{txs.reqData.ether} ETH</span>
            </li>
            <li className='txs__list-item'>
              <span className='txs__list-item-key'>hash: </span>
              <span className='txs__list-item-value'>{item.hash}</span>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}