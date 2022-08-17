import React from 'react';

const BalanceCard = ({title, data}) => {

  return (
    <div>
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-34 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-400">{title}</p>
            <p className="text-2xl">{data}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard;