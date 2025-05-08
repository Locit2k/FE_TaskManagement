import { MessageService } from 'primeng/api';
import { authInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

export const coreProviders = [
    MessageService,
    provideHttpClient(
        withInterceptors([authInterceptor])
      ),
]