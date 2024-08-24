export class HttpErrorMessageProducer {
  private statusCodeMessages = new Map<number, string>([
    [400, 'Bad Request. Please check your input.'],
    [401, 'Unauthorized. Please log in.'],
    [403, 'Forbidden. You do not have permission to access this resource.'],
    [404, 'Not Found. The resource you are looking for could not be found.'],
    [500, 'Internal Server Error. Please try again later.'],
    [503, 'Service Unavailable. Please try again later.'],
    [504, 'Gateway Timeout. The server took too long to respond.'],
  ]);

  generateErrorMessage(status: number): string {
    return (
      this.statusCodeMessages.get(status) ||
      'An unexpected error occurred. Please try again.'
    );
  }
}
