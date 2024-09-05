import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    const paymentDetails: PaymentDetails = {amount: 20,currency: 'dinar',method: PaymentMethod.CreditCard,cardNumber:'513' };
    const mockProcessPaymentResponse = {status: 'success',transactionId:'kk66' };
  
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);
    const result = paymentService.makePayment(paymentDetails);
    expect(result).toBe('Payment successful. Transaction ID: kk66');
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails);
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    //TODO: Mock processPayment implementation
    // Act
    //const result = paymentService.makePayment(paymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    // Check that processPayment inside makePayment has been called with paymentDetails
  });

  test('should throw an error for payment failure', () => {
    const paymentDetails: PaymentDetails = {amount: 202,currency: 'dinar',method:PaymentMethod.CreditCard,cardNumber:'123'};
    const mockProcessPaymentResponse = { status: 'failure' };
    paymentAdapterMock.processPayment.mockReturnValue(mockProcessPaymentResponse);
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    //TODO: Create mockProcessPaymentResponse object containing failure status
    //TODO: Mock processPayment implementation
    // Act & Assert
    //expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    const paymentDetails: PaymentDetails = { amount: -30,currency: 'dinar',method: PaymentMethod.CreditCard,cardNumber: '123',
    };
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    // Act & Assert
    //expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
