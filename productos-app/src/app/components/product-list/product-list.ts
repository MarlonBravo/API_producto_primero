import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule] 
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  createProduct(): void {
    alert('Pendiente');
  }

  editProduct(product: any): void {
    alert(`Editar producto : ${product.name}`);
  }

  deleteProduct(id: string): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
