import Link from "next/link";
import LikeIt from "../LikeIt/LikeIt";
import "./RestaurantCard.css";
import Image from "next/image";


export default function RestaurantCard({
  restaurant,
  id,
  fnMouseEnter,
  fnMouseLeave,
  ...props
}) {
  return (
    <>
      <div className="restaurant-item relative">
        <LikeIt id={id} className="absolute top-3 start-3" {...props} />

        <Link
          href={`/restaurants/${id}`}
          className="flex gap-6"
          onMouseEnter={() => fnMouseEnter(id)}
          onMouseLeave={fnMouseLeave}
        >
          <div className="w-[80px] h-[80px] md:w-[200px] md:h-[200px] overflow-hidden rounded-3xl">
            <Image
              src={restaurant.image ? restaurant.image : "no-res-image.jpg"}
              alt={`Foto restaurante ${restaurant.name}`}
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 justify-between">
            <div>
              <h2 className="text-[1.5rem] font-semibold mb-3">
                {restaurant.name}
              </h2>
              <p>{restaurant.address}</p>
            </div>

            
          </div>
        </Link>
      </div>
    </>
  );
}
