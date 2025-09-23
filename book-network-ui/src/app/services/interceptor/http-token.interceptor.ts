import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  
  // Récupérer le token depuis le TokenService
  const authToken = tokenService.token;

  // Cloner la requête et ajouter l'en-tête d'autorisation si le token existe
  let authReq = req;
  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('Token ajouté à la requête:', authToken.substring(0, 20) + '...');
  } else {
    console.warn('Aucun token disponible pour la requête');
  }

  // Passer la requête au prochain handler et gérer les erreurs
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expiré ou invalide
        console.error('Erreur 401: Token invalide ou expiré');
        tokenService.clearToken(); // Nettoyer le token invalide
        // Rediriger vers la page de login si nécessaire
      }
      return throwError(() => error);
    })
  );
};