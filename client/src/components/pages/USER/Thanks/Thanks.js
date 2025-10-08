import { Link } from "react-router-dom";

function Thanks() {
  return (
    <div className="pt-20 md:pt-28">
      <section class="container mx-auto py-6">
        <div class="flex items-center justify-center">
          <div class="p-4">
            <div class="flex flex-col items-center space-y-2">
              <ion-icon
                class="size-28 text-green-500"
                name="checkmark-circle-outline"
              ></ion-icon>
              <h1 class="text-4xl font-bold">Cảm Ơn !</h1>
              <p class="text-base font-normal text-gray484 max-w-[800px] text-center">
                Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng tôi. Chúng
                tôi cam kết sẽ giao đơn hàng đến tay bạn một cách nhanh chóng và
                thuận tiện nhất.
              </p>
              <Link
                className="flex items-center bg-rede31 px-4 py-2 text-white rounded-lg"
                to="/"
              >
                <ion-icon
                  class="size-4 mr-1"
                  name="arrow-undo-outline"
                ></ion-icon>
                <span class="text-sm font-medium">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Thanks;
