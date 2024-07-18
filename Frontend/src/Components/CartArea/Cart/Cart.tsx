import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../hooks/CartHooks/useCart";
import { CartDetails } from "../CartDetails/CartDetails";
import { CartList } from "../CartList/CartList";
import "./Cart.css";
import { BooleanParam, useQueryParam, useQueryParams } from "use-query-params";
import { useEffect } from "react";

interface CartProps {
  open: boolean;
  setOpen: () => void;
}

export function Cart({ open, setOpen }: CartProps): JSX.Element {
  const {
    activeIndices,
    cart,
    handleDecrementAmount,
    handleIncrementAmount,
    handleNextImage,
    handlePrevImage,
    handleRemove,
    subtotal,
  } = useCart();

  //   const {} = useQueryParam('cartOpen')
  const [query, setQuery] = useQueryParams({ cartOpen: BooleanParam });

//   useEffect(() => {
//     if (query.cartOpen !== undefined) {
//       setOpen(query.cartOpen);
//     }
//   }, [query.cartOpen, setOpen]);

//   useEffect(() => {
//     setQuery({ cartOpen: open });
//   }, [open, setQuery]);

//   const handleClose = () => {
//     setOpen(false);
//   };



  return (
    <Transition show={open}>
      <Dialog className="relative z-100 overflow-x-hidden" onClose={setOpen}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  z-50 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed z-50 inset-0 overflow-hidden">
          <div className="absolute z-50 inset-0 overflow-hidden">
            <div className="pointer-events-none  fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={setOpen}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <CartList
                        activeIndices={activeIndices}
                        cart={cart}
                        handleDecrementAmount={handleDecrementAmount}
                        handleIncrementAmount={handleIncrementAmount}
                        handleNextImage={handleNextImage}
                        handlePrevImage={handlePrevImage}
                        handleRemove={handleRemove}
                      />
                    </div>
                    <CartDetails
                      cart={cart}
                      setOpen={setOpen}
                      subtotal={subtotal}
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

